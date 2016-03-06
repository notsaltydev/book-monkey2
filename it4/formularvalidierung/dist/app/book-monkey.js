System.register(['angular2/core', './components/book-form/book-form', './models/book'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, book_form_1, book_1;
    var BookMonkeyApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (book_form_1_1) {
                book_form_1 = book_form_1_1;
            },
            function (book_1_1) {
                book_1 = book_1_1;
            }],
        execute: function() {
            BookMonkeyApp = (function () {
                function BookMonkeyApp() {
                    this.book = new book_1.Book('3243453245', '', []); // this book has invalid values
                }
                BookMonkeyApp = __decorate([
                    core_1.Component({
                        selector: 'book-monkey-app',
                        directives: [book_form_1.BookForm],
                        template: "Dieses Beispiel demonstriert die Validierung eines Formulars.\n  Weitere Bestandteile der BookMonkey-App sind aus Gr\u00FCnden der \u00DCbersichtlichkeit nicht Bestandteil dieser Demo.\n  <hr>\n  <book-form [book]=\"book\"></book-form>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], BookMonkeyApp);
                return BookMonkeyApp;
            })();
            exports_1("default", BookMonkeyApp);
        }
    }
});
//# sourceMappingURL=../../../app/book-monkey.js.map