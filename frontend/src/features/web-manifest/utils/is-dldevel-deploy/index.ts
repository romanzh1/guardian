import { WEB_MANIFEST } from '../../instance';
import { Deploy } from '../../constants';

export const isDldevelDeploy = () => WEB_MANIFEST.deploy === Deploy.DLDEVEL_DEPLOY;
