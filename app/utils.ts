export function getErrorMsg(error: Error) {
  if (error.message.includes('Provider not found')) {
    return '请先安装钱包';
  } else if (error.message.includes('User rejected the request')) {
    return '已取消';
  }
  return '出错了';
}
