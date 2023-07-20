import { DateFieldCore } from '@teable-group/core';
import { Mixin } from 'ts-mixer';
import { Field } from './field';

export class DateField extends Mixin(DateFieldCore, Field) {}
