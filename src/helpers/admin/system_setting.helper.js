import { fieldHelper } from ".."

export const systemSettingHelper = {
  canDelete,
  canEdit,
  key,
  modelName,
  value
}

function canDelete(_user, _systemSetting) {
  return false
}

function canEdit(_user, _systemSetting) {
  return false
}

function key(systemSetting) {
  return fieldHelper.getField(systemSetting, "key")
}

function modelName() {
  return 'systemSetting'
}

function value(systemSetting) {
  return fieldHelper.getField(systemSetting, "value")
}
