import Notification from '../vc-notification';
import './style'
const notificationInstance = {};
let defaultDuration = 4.5;
let defaultTop = '24px';
let defaultBottom = '24px';
let defaultPlacement = 'topRight';
let defaultGetContainer = () => document.body;
let defaultCloseIcon = null;

function setNotificationConfig(options) {
  const { duration, placement, bottom, top, getContainer, closeIcon } = options;
  if (duration !== undefined) {
    defaultDuration = duration;
  }
  if (placement !== undefined) {
    defaultPlacement = placement;
  }
  if (bottom !== undefined) {
    defaultBottom = typeof bottom === 'number' ? `${bottom}px` : bottom;
  }
  if (top !== undefined) {
    defaultTop = typeof top === 'number' ? `${top}px` : top;
  }
  if (getContainer !== undefined) {
    defaultGetContainer = getContainer;
  }
  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon;
  }
}

function getPlacementStyle(placement, top = defaultTop, bottom = defaultBottom) {
  let style;
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto',
      };
      break;
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto',
      };
      break;
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      };
      break;
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom,
      };
      break;
  }
  return style;
}

function getNotificationInstance(
  {
    prefixCls,
    placement = defaultPlacement,
    getContainer = defaultGetContainer,
    top,
    bottom,
    closeIcon = defaultCloseIcon,
  },
  callback,
) {
  const cacheKey = `${prefixCls}-${placement}`;
  if (notificationInstance[cacheKey]) {
    callback(notificationInstance[cacheKey]);
    return;
  }
  Notification.newInstance(
    {
      prefixCls,
      class: `${prefixCls}-${placement}`,
      style: getPlacementStyle(placement, top, bottom),
      getContainer,
      closeIcon: h => {
        const icon = typeof closeIcon === 'function' ? closeIcon(h) : closeIcon;
        const closeIconToRender = (
          <span class={`${prefixCls}-close`}>
            {icon || <i class="fa fa-close"></i>}
          </span>
        );
        return closeIconToRender;
      },
    },
    notification => {
      notificationInstance[cacheKey] = notification;
      callback(notification);
    },
  );
}

const typeToIcon = {
    info: 'fa fa-info-circle',
    success: 'fa fa-check-circle',
    error: 'fa fa-times-circle',
    warning: 'fa fa-exclamation-circle',
};

function notice(args) {
  const { icon, type, description, message, btn } = args;
  const outerPrefixCls = args.prefixCls || 'li-ui-notification';
  const prefixCls = `${outerPrefixCls}-notice`;
  const duration = args.duration === undefined ? defaultDuration : args.duration;

  let iconNode = null;
  if (icon) {
    iconNode = h => (
        <i class={[iconType,`${prefixCls}-icon`,'fa-icon']}></i>
    );
  } else if (type) {
    const iconType = typeToIcon[type];
    iconNode = h => <i class={[iconType,`${prefixCls}-icon`,'fa-icon',`fa-icon-${type}`]}></i>; // eslint-disable-line
  }
  const { placement, top, bottom, getContainer, closeIcon } = args;
  getNotificationInstance(
    {
      prefixCls: outerPrefixCls,
      placement,
      top,
      bottom,
      getContainer,
      closeIcon,
    },
    notification => {
      notification.notice({
        content: h => (
          <div class={iconNode ? `${prefixCls}-with-icon` : ''}>
            {iconNode && iconNode(h)}
            <div class={`${prefixCls}-message`}>
              {!description && iconNode ? (
                <span class={`${prefixCls}-message-single-line-auto-margin`} />
              ) : null}
              {typeof message === 'function' ? message(h) : message}
            </div>
            <div class={`${prefixCls}-description`}>
              {typeof description === 'function' ? description(h) : description}
            </div>
            {btn ? (
              <span class={`${prefixCls}-btn`}>{typeof btn === 'function' ? btn(h) : btn}</span>
            ) : null}
          </div>
        ),
        duration,
        closable: true,
        onClose: args.onClose,
        onClick: args.onClick,
        key: args.key,
        style: args.style || {},
        class: args.class,
      });
    },
  );
}

const api = {
  open: notice,
  close(key) {
    Object.keys(notificationInstance).forEach(cacheKey =>
      notificationInstance[cacheKey].removeNotice(key),
    );
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach(cacheKey => {
      notificationInstance[cacheKey].destroy();
      delete notificationInstance[cacheKey];
    });
  },
};

['success', 'info', 'warning', 'error'].forEach(type => {
  api[type] = args =>
    api.open({
      ...args,
      type,
    });
});

api.warn = api.warning;
export default api;
