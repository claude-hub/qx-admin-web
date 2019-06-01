/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile (phone) {
  if (phone.length !== 11) {
    return false
  }
  return /^1[3|5|7|8][0-9]\d{4,8}$/.test(phone)
}
/**
 * 判断是否为空
 */
export function validatenull (val) {
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
};
