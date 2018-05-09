import { Grid } from 'semantic-ui-react'
import DetailTable from '../molecules/DetailTable'
import Button  from '../atoms/Button'
import Table from '../atoms/Table'
import Modal from '../molecules/Modal'
import H1 from '../atoms/H1'
import H3 from '../atoms/H3'
import H5 from '../atoms/H5'
import Flex from '../atoms/Flex'
import Label from '../atoms/Label'
import Wrapper from '../atoms/Wrapper'
import color from "../../static/json/color.json"

const buttonJson = status => [
	{
		name:'รอส่ง',
		background: status==='pending'? color.warning : color.disabled,
		value: 'pending'
	},
	{
		name:'ส่งแล้ว',
		background: status==='sent'? color.primary : color.disabled,
		value: 'sent'
	},
	{
		name:'รับแล้ว',
		background: status==='received'? color.success : color.disabled,
		value: 'received'
	},
	{
		name:'ดู',
		background: color.darkText,
		value:'view'
	}
]
const colorStatus = (status, current) => {
	if(status === current) {
		if(current ==='pending'){
			return color.warning
		}
		else if (current ==='sent'){
			return color.primary
		}
		else if (current ==='received'){
			return color.success
		}
	}
	else return color.disabled
}
const PrintElem = elem => 
{
	var mywindow =  window.open('', '', 'left=0,top=0,width=750,height=400,toolbar=0,scrollbars=0,status=0');
	var prtContent = document.getElementById(elem)
	mywindow.document.write('<html><head><title>Sharemai</title>');
	mywindow.document.write('</head><body >');
	mywindow.document.write(prtContent.innerHTML);
	mywindow.document.write('</body></html>');

	mywindow.document.close(); // necessary for IE >= 10
	mywindow.focus(); // necessary for IE >= 10*/

	mywindow.print();
	mywindow.close();
	return true;
}
export default ({status, setOrderStatus, transactionInfo}) => (
	<div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
		{buttonJson(status).map(button=>
			<Button fixedSize small background={button.background}
				width="100%"
				onClick={setOrderStatus
				?()=>setOrderStatus(transactionInfo.transactionId, button.value)
				:null}
			>
			{button.value === 'view'
			?<Modal
				context={
					<Grid reversed='mobile' columns='equal' stackable>
						<Grid.Column computer={8}>
							<Wrapper color="black">
							<H3 color="black" left>รายละเอียดการสั่งซื้อ</H3>
								{<DetailTable transactionInfo={[transactionInfo]} />}
						</Wrapper>
						</Grid.Column>
						<Grid.Column computer={8}>
							<Wrapper padding="10px 5vh">
								<div id="print-section">
									<H1 color="black" left>ที่อยู่การจัดส่ง</H1>
									<H5 color="black" left>{transactionInfo.name}</H5>
									<H5 color="black" left>{transactionInfo.phoneNumber}</H5>
									<H5 color="black" left>{transactionInfo.address1}</H5>
									<H5 color="black" left>{transactionInfo.address2}</H5>
									<H5 color="black" left>{transactionInfo.province} {transactionInfo.postalCode} </H5>
								</div>
								<Button color="orange" onClick={() => PrintElem('print-section')}><H1 color="white">พิมพ์</H1></Button>
								<H1 color="black" left padding="0" margin="0">สถานะ:</H1>
								<Flex direction="inherit" wrap="nowrap">
									<Table textAlign="center" marginTop="10px">
										<tbody>
											<tr>
												<Button minWidth="110px" background={colorStatus(status,'pending')} >รอดำเนินการ</Button>
											</tr>
											<tr>
												<Button minWidth="110px" background={colorStatus(status,'sent')} >จัดส่งแล้ว</Button>
											</tr>
											<tr>
												<Button  minWidth="110px" background={colorStatus(status,'received')} >ได้รับแล้ว</Button>
											</tr>
										</tbody>
									</Table>
								</Flex>
							</Wrapper>
						</Grid.Column>
				</Grid> 
				}
			>
			<span>รายละเอียด</span>
			</Modal>
			: button.name
			}
		</Button>
		)}
		
	</div> 
)