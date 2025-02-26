import * as bcrypt from 'bcrypt';

/**
 * Хэширует пароль с использованием bcrypt.
 *
 * @param {string} password - Пароль, который необходимо хэшировать.
 * @returns {Promise<{ hash: string, salt: string }>} Объект, содержащий хэшированный пароль и соль.
 * @throws {Error} Если возникла ошибка при генерации соли или хэшировании.
 */
export async function passwordHashed(password: string): Promise<string> {
  try {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error(`Ошибка при хэшировании пароля: ${error.message}`);
  }
}

/**
 * Проверяет, соответствует ли пароль хэшированному паролю.
 *
 * @param {string} password - Пароль, который необходимо проверить, на соответствие хэшированному паролю.
 * @param {string} hash - Хэш из бд
 * @returns {Promise<boolean>} Пароль соответствует хэшу или нет.
 *
 */

export async function passwordCheck(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    const result = bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    throw new Error(`Ошибка при проверке пароля: ${error.message}`);
  }
}
