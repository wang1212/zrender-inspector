/*!
 * My lib
 */
export {
  /** 版本信息 */
  version as VERSION,
} from '../package.json';

/**
 * 类
 */
export class Hello {
  static str = 'Hello world!';

  static getStr() {
    return Hello.str;
  }
}
