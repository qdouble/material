/* tslint:disable */
export class RegexValues {
    static address = '^([^<>\\/\\\'"&*$;?!|{}=]){2,254}$';
    static email = '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$';
    static nameValue = '^([^<>\\/\\\*"\'$?!;|=@#%^&()_{}:,.~`+]){2,74}$';
    static password = '^([A-z0-9!@#$%^&*.]){6,30}$';
    static phone = '^([0-9Xx ()+.-]){7,30}$';
    static username = '^([^<>\\/\\\*$;&\'?!{}|=.@, :_#"~%^()+-]){3,30}$';
    static zipCode = '^\\d{5}(?:[-\\s]\\d{4})?$';
}
