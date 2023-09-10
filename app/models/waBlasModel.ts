import type { IRootModel } from './rootModel'

export interface IWaBlasUserCategoryModel extends IRootModel {
  waBlasUserCategoryId?: string
  waBlasUserCategoryName?: string
}

export interface IWaBlasUserModel extends IRootModel {
  waBlasUserId?: string
  waBlasUserName?: string
  waBlasUserWhatsappNumber?: string
  category?: IWaBlasUserCategoryModel
}
