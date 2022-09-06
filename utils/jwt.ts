import jwt from 'jsonwebtoken'

import UserEntity from 'app/modules/accounts/entities/user.entity'
import { AppKey } from 'config/index'

export const generateToken = (
  user: Partial<UserEntity>,
  expiresIn: string | number | undefined = '1d'
) => {
  return jwt.sign(
    {
      data: {
        id: user.id,
        first_name: user.first_name,
        username: user.username,
        email: user.email,
      },
    },
    AppKey.APP_KEY as string,
    { expiresIn }
  )
}
