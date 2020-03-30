import {Service} from '@roqueando/nous';

export default class Example extends Service {
  public hello(name: string) {
    return `Hello: ${name}`;
  }
}
