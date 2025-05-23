export default {
   computed: {
       swFieldType() {
           if (this.type === 'price') {
               return {
                   type: 'price',
                   allowModal: true,
                   hideListPrices: true,
                   currency: this.currency,
               };
           }

           if (this.hasConfig && this.config.hasOwnProperty('type')) {
               return {};
           }

           if (this.type === 'int') {
               return { type: 'number', numberType: 'int' };
           }

           if (this.type === 'float') {
               return { type: 'number', numberType: 'float' };
           }

           if (this.type === 'string' || this.type === 'text') {
               return { type: 'text' };
           }

           if (this.type === 'bool' || this.type === 'boolean') {
               return { type: 'switch', bordered: true };
           }

           if (this.type === 'datetime') {
               return { type: 'date', dateType: 'datetime' };
           }

           if (this.type === 'date') {
               return { type: 'date', dateType: 'date' };
           }

           if (this.type === 'time') {
               return { type: 'date', dateType: 'time' };
           }

           return { type: this.type };
       },
   },
}
