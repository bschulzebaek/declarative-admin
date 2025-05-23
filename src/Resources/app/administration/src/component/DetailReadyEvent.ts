export default class DetailReadyEvent extends Event {
    public static NAME = 'declarative/detail-ready';

    constructor(public entityType: string, public entity: any) {
        super(DetailReadyEvent.NAME);
    }
}
