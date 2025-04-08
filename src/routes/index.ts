import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { NotificationRoutes } from '../app/modules/Notification/Notification.route';
import { ParentRoutes } from '../app/modules/parent/parent.route';
import { BabySitterRoutes } from '../app/modules/babySitter/babySitter.route';
import { InboxRoutes } from '../app/modules/inbox/inbox.route';
import { MessageRoutes } from '../app/modules/message/message.route';
import { ConnectionRoutes } from '../app/modules/connection/connection.route';
import { UniqueKeyRoutes } from '../app/modules/UniqueKey/UniqueKey.route';
import { EmergancyContactRoutes } from '../app/modules/emergancyContact/emergancyContact.route';
import { EmergancyAlertRoutes } from '../app/modules/emergancyAlert/emergancyAlert.route';
import { LogRoutes } from '../app/modules/log/log.route';
import { LogAcceptRoutes } from '../app/modules/acceptLog/acceptLog.route';
import { VideoReqRoutes } from '../app/modules/videoReq/videoReq.route';
import { VideoRoutes } from '../app/modules/video/video.route';
import { SubscriptionRoutes } from '../app/modules/subscription/subscription.route';
import { DashboardRoutes } from '../app/modules/dashboard/dashboard.route';
import { SleepAlertRoutes } from '../app/modules/sleepAlert/sleepAlert.route';

const router = express.Router();

const apiRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/auth', route: AuthRoutes },
  { path: '/notification', route: NotificationRoutes },
  { path: '/parent', route: ParentRoutes },
  { path: '/baby-sitter', route: BabySitterRoutes },
  { path: '/inbox', route: InboxRoutes },
  { path: '/message', route: MessageRoutes },
  { path: '/connection', route: ConnectionRoutes },
  { path: '/unique-key', route: UniqueKeyRoutes },
  { path: '/emergancy-contact', route: EmergancyContactRoutes },
  { path: '/emergancy-alert', route: EmergancyAlertRoutes },
  { path: '/log', route: LogRoutes },
  { path: '/acceptLog', route: LogAcceptRoutes },
  { path: '/video-req', route: VideoReqRoutes },
  { path: '/video', route: VideoRoutes },
  { path: '/subscription', route: SubscriptionRoutes },
  { path: '/dashboard', route: DashboardRoutes },
  { path: '/sleep-alert', route: SleepAlertRoutes },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
