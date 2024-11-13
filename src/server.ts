import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';

import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { PassRoute } from '@routes/passes.route';
import { TagRoute } from '@routes/tags.route';
import { TitleRoute } from '@routes/titles.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new PassRoute(), new TagRoute(), new TitleRoute()]);

app.start();
