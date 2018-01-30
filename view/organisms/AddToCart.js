import styled from 'styled-components'
import AddItem from '../molecules/AddItem'
import Router from 'next/link'
import Button from '../atoms/Button'

const CheckoutWrap = styled.div`
width: -webkit-fill-available;
max-width: 400px;
display: flex; 
flex-flow: column nowrap;
@media (max-width: 700px) {
	background: palevioletred;
	position: absolute;
	bottom: 10px;
	max-width: 100%;
	width: 88vw;
}
`
export default ({minusQuantity, addQuantity, productUid, productQuantity, addProductTransaction, sellerId}) => 
<CheckoutWrap>
<AddItem onClickMinus={minusQuantity} onClickAdd={addQuantity} productUid={productUid} productQuantity={productQuantity}/>
<Button onClick={()=>addProductTransaction({productQuantity, productUid, sellerId})} margin="2px 0 0 0">สั่งเลย</Button>
</CheckoutWrap>
