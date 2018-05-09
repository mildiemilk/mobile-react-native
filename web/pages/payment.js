import React from 'react'
import PaymentView from '../view/environment/Payment'
import withRedux from "next-redux-wrapper"
import store from '../lib/store'
import { reduxForm, formValues, formValueSelector } from 'redux-form'
import { createPayment, savePaymentImage } from '../lib/handlers/payment'
import { savePaymentPending, savePaymentSuccess } from '../lib/actions/payment'
import { addProductTransaction, addPayment, addBankTransfer } from '../lib/actions/transaction'
import { calculateComission } from '../lib/handlers/transaction'
import { validateCreditCard } from '../lib/helpers/formvalidation'
import Modal from '../view/molecules/Modal'
import Wrapper from '../view/atoms/Wrapper'
import H3 from '../view/atoms/H3'
import WebExplain from '../view/organisms/WebExplain'
import fetch from 'isomorphic-fetch'
import loadFirebase from '../lib/database'
import { findDOMNode } from 'react-dom'
import $ from 'jquery'
import { Button } from 'semantic-ui-react'
import Ipad from '../static/img/ipadpayment.svg'
import Phone from '../static/img/cardpayment.svg'
import styled from 'styled-components'

class Payment extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			refno : '',
			status : ''
		}
	}

	async componentDidMount() {
		const { queryParams } = this.props.url.query
		queryParams? this.setState({ status: queryParams.paymentStatus }) : null
		const { transaction } = this.props
			let comission = calculateComission(transaction.price, transaction.comissionCash)
	} 

	ModalContext = () => 
		<Wrapper>
			<H3>ทำรายการเรียบร้อย</H3>
			<WebExplain/>
		</Wrapper>

	onSubmit = async() => {
		const form = findDOMNode(this.refs.formPayment)
		const refno = Date.now()%10000000000
		this.setState({ refno })
		await createPayment(this.props.transaction, refno)
		$(form).submit()
	}

	render() { 
		const { refno, status } = this.state
		const { transaction } = this.props
		const card = {
			name : process.env.NODE_ENV === 'production'? '' :'john doe', 
			cardNumber : process.env.NODE_ENV === 'production'? '' :'4242424242424242', 
			securityCode:process.env.NODE_ENV === 'production'? '' :'123', 
			expiryMonth:process.env.NODE_ENV === 'production'? '' :'7', 
			expiryYear:process.env.NODE_ENV === 'production'? '' :'2019'
		}
		return status === 'success'? 
		this.ModalContext() :
		<div>
			<PaymentView 
				{...this.props}
				{...this.state}
				onCheckOut={()=>createPayment(total, card ,transaction)}
				savePaymentImage={savePaymentImage}
				onSubmit={this.onSubmit}
			/>
				<form ref="formPayment" method="post" action="https://www.thaiepay.com/epaylink/payment.aspx">
					<div style={{width:'100%', maxWidth:'530px', display:'flex', alignContent:'center', flexDirection:'column', backgroundColor:'teal'}}>
						<input type="hidden" name="refno" value={refno}/>
						<input type="hidden" name="merchantid" value="41911567"/>
						<input type="hidden" name="customeremail" value={transaction.email}/>
						<input type="hidden" name="productdetail" value={transaction.productName}/>
						<input type="hidden" name="total" value={transaction.price * transaction.quantity}/>
						<Button 
							color='orange'
							style={{fontSize:'120%'}}
							onClick={this.onSubmit}
						>
							อินเตอร์เน็ตแบงค์กิ้ง/บัตรเครดิต
						</Button>
					<div style={{width:'100px', height:'auto'}}>
						<Ipad/>
					</div>
				</div>
			</form>

		</div>
	}
}

Payment = reduxForm({form: 'payment'})(Payment)

const selector = formValueSelector('payment')
const mapStateToProps = state =>({
	cardDetail : state.form.payment ? state.form.payment.values : null,
	total : state.payment.total,
	products: state.userProducts,
	transaction: state.transaction,
	user: state.user,
	validateCreditCard: validateCreditCard(selector(state, 'cardNumber'), selector(state, 'month'), selector(state,'year')),
	startedUploadImage: state.payment.startedUploadImage,
	pending: state.payment.pending,
	image: state.transaction.paymentImage
})

const mapDispatchToProps = {
	addProductTransaction, 
	addPayment, 
	addBankTransfer,
	savePaymentPending,
	savePaymentSuccess
}

export default withRedux(()=>store,mapStateToProps, mapDispatchToProps)(Payment)