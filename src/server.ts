import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';

import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { CouponRoute } from '@routes/coupons.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new CouponRoute()]);

app.start();
