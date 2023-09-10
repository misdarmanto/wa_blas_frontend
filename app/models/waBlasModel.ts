import type { IRootModel } from './rootModel'

export interface IWaBlasUserModel extends IRootModel {
  waBlasUserId?: string
  waBlasUserName?: string
  waBlasUserWhatsappNumber?: string
  waBlasUserCategory?: string
}

export interface IWaBlasUserCategoryModel extends IRootModel {
  waBlasUserCategoryId?: string
  waBlasUserCategoryName?: string
}
