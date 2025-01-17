import { MoreHorizontal, Pencil, Settings, Trash2 } from '@teable/icons';
import { useBase, useTablePermission, useTables } from '@teable/sdk/hooks';
import type { Table } from '@teable/sdk/model';
import { ConfirmDialog } from '@teable/ui-lib/base';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@teable/ui-lib/shadcn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { tableConfig } from '@/features/i18n/table.config';

interface ITableOperationProps {
  className?: string;
  table: Table;
  onRename?: () => void;
}

export const TableOperation = (props: ITableOperationProps) => {
  const { table, className, onRename } = props;
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const permission = useTablePermission();
  const base = useBase();
  const tables = useTables();
  const router = useRouter();
  const { baseId, tableId: routerTableId } = router.query;
  const { t } = useTranslation(tableConfig.i18nNamespaces);

  const menuPermission = useMemo(() => {
    return {
      deleteTable: permission['table|delete'],
    };
  }, [permission]);

  const deleteTable = async () => {
    const tableId = table?.id;
    if (!tableId) {
      return;
    }
    await base.deleteTable(tableId);
    const firstTableId = tables.find((t) => t.id !== tableId)?.id;
    if (routerTableId === tableId) {
      router.push(
        firstTableId
          ? {
              pathname: '/base/[baseId]/[tableId]',
              query: { baseId, tableId: firstTableId },
            }
          : {
              pathname: '/base/[baseId]',
              query: { baseId },
            }
      );
    }
  };

  if (!Object.values(menuPermission).some(Boolean)) {
    return null;
  }

  return (
    <>
      {menuPermission.deleteTable && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <MoreHorizontal className={className} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[160px]"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem onClick={() => onRename?.()}>
              <Pencil className="mr-2" />
              {t('table:table.rename')}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={{
                  pathname: '/base/[baseId]/[tableId]/design',
                  query: { baseId, tableId: table.id },
                }}
                title={t('table:table.design')}
              >
                <Settings className="mr-2" />
                {t('table:table.design')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteConfirm(true)}>
              <Trash2 className="mr-2" />
              {t('common:actions.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <ConfirmDialog
        open={deleteConfirm}
        onOpenChange={setDeleteConfirm}
        title={t('table:table.deleteConfirm', { tableName: table?.name })}
        cancelText={t('common:actions.cancel')}
        confirmText={t('common:actions.confirm')}
        content={
          <div className="space-y-2 text-sm">
            <p>1. {t('table:table.deleteTip1')}</p>
            <p>2. {t('table:table.deleteTip2')}</p>
          </div>
        }
        onCancel={() => setDeleteConfirm(false)}
        onConfirm={deleteTable}
      />
    </>
  );
};
