import React from 'react'
import { Image } from 'react-bootstrap'
import { Icon, Grid, Form, Divider } from 'semantic-ui-react'
import Head from './DefaultHead'
import Header from './Header'
import { TextInput, NumberInput } from '../components/Form'
import { FieldArray } from 'redux-form'
import { Button, H1, SubImage, MainImage } from '../components/Styled'
import ProductDescriptionPreview from '../components/ProductDescription'
import ProductDescriptionForm from '../components/ProductDescriptionForm'
import styled from 'styled-components'


const ImageSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width:400px;
`

const Segment = styled.div`
	padding: 2px 0px 2px 2px;
`

const SubImageSection = styled.div`
display: flex;
justify-content: space-between;
`

const InfoWrap = styled.div`
	border: 1px solid #ccc; 
	min-height: 320px; 
	min-width: 320px;
	width: 100%;
	max-width: 800px;
	flex: 1 1 auto;
	margin: 0px 4px 0px 2px;
`
const ImportantInfoWrap = styled.div`
	display: flex;
	flex-flow: row wrap;
`

const PriceWrap = styled.div`
	padding-left:7px;
`

const calcComissionCash = (value, previousValue, allValues) => 
(value > (0.75 - allValues['comissionPercent']/100) * allValues['price'] ? (0.75 - allValues['comissionPercent']/100) * allValues['price']: value )

const calcComissionPercent = value => value >= 75 ? 75 : value

export default ({addProductDescription, productDescription, handleSubmit, setProductImage}) => 
<div>
	<Head/>
	<Header/>
	<Segment>
		<ImportantInfoWrap>
			<ImageSection>
				<MainImage setProductImage={setProductImage}/>
				<SubImageSection>
					<SubImage/>
					<SubImage/>
					<SubImage/>
					<SubImage/>
					<SubImage/>					
				</SubImageSection>
			</ImageSection>
			<InfoWrap>
				<Form>
					<TextInput name="productName" type="text" placeholder="product name"/>
					<TextInput name="brandName" type="text" placeholder="brand name" />
					<PriceWrap>
						<Form.Group  widths='equal'>
							<TextInput name="price" type="number" placeholder="price = 00.00 baht" width="2" />
							<TextInput
								name="comissionPercent"
								type="number"
								placeholder="comission 00%"
								normalizer={calcComissionPercent}
								width="1"
							/>
							<TextInput
								name="comissionCash"
								type="number"
								placeholder="comission 00 baht"
								normalizer={calcComissionCash}
								width="1"
							/>
						</Form.Group>
					</PriceWrap>
						<FieldArray name="productDescription" component={ProductDescriptionForm} productDescription={productDescription}/>
						<Button fluid size='big' onClick={()=>handleSubmit(productDescription)}>Submit</Button>
				</Form>
			</InfoWrap>
		</ImportantInfoWrap>
	</Segment>
	<ProductDescriptionPreview productDescription={productDescription} />
</div>
