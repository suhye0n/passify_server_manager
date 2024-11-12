import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';

import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { CouponRoute } from '@routes/coupons.route';
import { TagRoute } from '@routes/tags.route';
import { TitleRoute } from '@routes/titles.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new CouponRoute(), new TagRoute(), new TitleRoute()]);

app.start();
