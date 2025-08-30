export default `<input 
type="{{type}}" 
name="{{name}}" 
{{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
class="app__main-input"/>
<p id="{{name}}" class="app__invalid-input hidden">
Невалидный input
</p>`

