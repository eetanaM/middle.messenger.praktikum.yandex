import type { TLoginPage } from "../../../pages/Authorization/LoginPage";
import type { TRegisterPage } from "../../../pages/Authorization/RegisterPage";
import type { TBadServerPage } from "../../../pages/BadServerPage";
import type { TMainContentPage } from "../../../pages/MainContentPage";
import type { TNotFoundPage } from "../../../pages/NotFoundPage";
import type { TPreviewPage } from "../../../pages/PreviewPage";
import type { TProfilePage } from "../../../pages/ProfilePage";

export type TPageBlock = | TLoginPage
| TRegisterPage
| TBadServerPage
| TMainContentPage
| TNotFoundPage
| TPreviewPage
| TProfilePage;
