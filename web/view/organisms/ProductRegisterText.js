import Wrapper from '../atoms/Wrapper'
import Input from '../molecules/InputWithLabel'
import { formatInt } from '../../lib/helpers/formvalidation'

export default () => 
<div style={{width:'100%', minWidth:'320px', padding:'0', margin:'0'}}>
    <Input name="productName" placeholder="iPhone 8 สีแดง 64GB">
        ชื่อสินค้า
    </Input>
    <Input name="brandName" placeholder="Apple">
        ชื่อแบรนด์
    </Input>
    <Input format={formatInt} name="price" placeholder="36000.00 บาท">
        ราคา
    </Input>
    <Input  format={formatInt} name="stock" placeholder="100">
        จำนวนสต๊อก
    </Input>
</div>