import { WEB_MANIFEST } from '../../instance';
import { Deploy } from '../../constants';

export const isStageDeploy = () => WEB_MANIFEST.deploy === Deploy.STAGE_DP_DEPLOY;
