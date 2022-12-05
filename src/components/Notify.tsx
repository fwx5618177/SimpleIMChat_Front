import { notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const openNotificationWithIcon = (type: NotificationType, msg: string, description: string, placement: NotificationPlacement) => {
    notification[type]({
        message: msg,
        description,
        placement,
    })
}
