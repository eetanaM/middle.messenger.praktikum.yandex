export default `<form class="credentials__form">
        {{#each fileInputs}}
        {{> FileInput type=type name=name id=id src=src }}
        {{/each}}
        {{#each inputs}}
            {{> FormInput type=type name=name placeholder=placeholder }}
        {{/each}}
        {{#each button}}
            {{> Button id=id text=textContent }}
        {{/each}}
    </form>`