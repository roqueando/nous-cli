import Service from '../core/Service';
import Serviceable from '../contracts/Serviceable';

export default class Example extends Service implements Serviceable {

    public hello(name: string) {
        return `Hello, ${name}`;
    }
}
