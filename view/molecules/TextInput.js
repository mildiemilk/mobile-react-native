import styled from 'styled-components'
import Field from '../atoms/Field'
import Label from '../atoms/Label'

export default ({type,name, placeholder, label, value, normalizer, width}) =>
<div>
	<Label>{label}</Label>
	<Field 
		width={width}
		className="form-control"
		id="formBasicText" 
		name={name} 
		component="input"
		placeholder={placeholder}
		type={type} 
		normalize={normalizer}
	/>
</div>
