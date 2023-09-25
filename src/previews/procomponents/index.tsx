import ProForm from './ProForm';
import ProTable from './ProTable';

import type { ComponentDemo } from '../../interface';

export type PreviewerDemos = Record<string, ComponentDemo[]>;

const ProComponentDemos: PreviewerDemos = {
  ProTable,
  ProForm,
};

export default ProComponentDemos;
