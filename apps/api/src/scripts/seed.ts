import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Business } from '../models/Business.js';
import { Expense } from '../models/Expense.js';
import { Invoice } from '../models/Invoice.js';
import { Employee } from '../models/Employee.js';
import { Payroll } from '../models/Payroll.js';
import { Receipt } from '../models/Receipt.js';
import { Transaction } from '../models/Transaction.js';
import { Notification } from '../models/Notification.js';
import { AIInsight } from '../models/AIInsight.js';

await connectDB();
await Promise.all([
  User.deleteMany({}), Business.deleteMany({}), Expense.deleteMany({}), Invoice.deleteMany({}),
  Employee.deleteMany({}), Payroll.deleteMany({}), Receipt.deleteMany({}), Transaction.deleteMany({}),
  Notification.deleteMany({}), AIInsight.deleteMany({})
]);

const user:any = await User.create({ name:'ALAT Admin', email:'admin@alatfinance.com', password:'Password123!', role:'super_admin', isEmailVerified:true });
const business:any = await Business.create({ name:'ALAT Demo Company', industry:'Fintech', currency:'NGN', owner:user._id, members:[{user:user._id,role:'super_admin'}] });
user.businesses=[business._id]; user.activeBusiness=business._id; await user.save();

const expenses = await Expense.create([
  {business:business._id,createdBy:user._id,title:'Office internet',amount:85000,category:'Utilities',department:'Operations',approvalStatus:'approved'},
  {business:business._id,createdBy:user._id,title:'Meta ads campaign',amount:240000,category:'Marketing',department:'Growth',approvalStatus:'approved'},
  {business:business._id,createdBy:user._id,title:'Team lunch',amount:65000,category:'Food',department:'HR',approvalStatus:'pending'}
]);
const invoices = await Invoice.create([
  {business:business._id,clientName:'Nerdeye Ltd',clientEmail:'finance@nerdeye.test',invoiceNumber:'ALAT-1001',items:[{description:'Software consulting',quantity:1,unitPrice:900000}],tax:0,discount:0,total:900000,status:'paid'},
  {business:business._id,clientName:'Moedify Agency',invoiceNumber:'ALAT-1002',items:[{description:'Dashboard implementation',quantity:1,unitPrice:450000}],total:450000,status:'pending'}
]);
const emp:any=await Employee.create({business:business._id,name:'Jane Accountant',email:'jane@alatfinance.com',department:'Finance',role:'Accountant',salary:300000,status:'active'});
await Payroll.create({business:business._id,employee:emp._id,month:'2026-05',baseSalary:300000,bonuses:50000,deductions:10000,tax:25000,netPay:315000,status:'approved'});
await Receipt.create({business:business._id,invoice:invoices[0]._id,receiptNumber:'RCT-1001',amount:900000,paidBy:'Nerdeye Ltd'});
await Transaction.create([
  {business:business._id,type:'income',source:'invoice',amount:900000,description:'Invoice ALAT-1001',referenceId:String(invoices[0]._id)},
  ...expenses.map((e:any)=>({business:business._id,type:'expense',source:'expense',amount:e.amount,description:e.title,referenceId:String(e._id)}))
]);
await Notification.create({business:business._id,user:user._id,title:'Welcome to ALAT Financial System',message:'Your demo workspace is ready.',type:'system'});
await AIInsight.create({business:business._id,prompt:'How can we reduce expenses?',summary:'Marketing and operational utilities are the largest current spending areas. Review recurring subscriptions and campaign ROI.',recommendations:['Audit marketing campaign ROI','Negotiate internet and SaaS subscriptions','Set approval limits for food and miscellaneous expenses']});

console.log('Seed complete. Login: admin@alatfinance.com / Password123!');
process.exit(0);
