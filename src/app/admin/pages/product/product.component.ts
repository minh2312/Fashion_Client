import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Color } from 'src/app/models/color';
import { CategoryService } from 'src/app/service/category.service';
import { ColorService } from 'src/app/service/color.service';
import Swal from 'sweetalert2';
import * as $ from "jquery";
import { HandleFileService } from 'src/app/service/handle-file.service';
import { HttpClient } from '@angular/common/http';

declare function multipleSelectOption(): void;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})



export class ProductComponent implements OnInit  {

  constructor(private colorService: ColorService,private categoryService:CategoryService,private handleFile : HandleFileService,private http:HttpClient) { }

  ckeditorContent = "";

  data: Category[] = [];

  category: Category[] = [];

  allCategory : Category[] = [];

  categoryPareant0:Category[] = [];

  categoryPareant:Category[] = [];

  colors : Color[] = [];

  totalLength: any;

  page: number = 1;

  itemPage: number = 10;

  nameSearch: any;

  checkPareant:boolean = false;

  startItem : any = 1;

  file: any;

  

  info: FormGroup = new FormGroup({
    id: new FormControl(''),
    productName : new FormControl(''),
    price : new FormControl(''),
    salePrice : new FormControl(''),
    quantity : new FormControl(''),
    image : new FormControl(''),
    multipleImage : new FormControl(''),
    colors:new FormControl(''),
    category:new FormControl(''),
    size :new FormControl(''),
    description : new FormControl('')
  })

  ngOnInit(): void {
    multipleSelectOption();
    this.getDataService();
    this.getDataColor();
    this.getDataCategoryPareant();
    this.getCategoryPareant();
    
    
  }

  openToast(title:any,icon:any) {
    let toastr = Swal.fire({
      title: title,
      toast : true,
      icon: icon,
      position : 'top-end',
      showCancelButton : false,
      showConfirmButton : false,
      timerProgressBar: true,
      timer: 1800
    });
  }


  // get data to service

  getDataService() {
    
  }


  getDataColor() {
    this.colorService.getColor().subscribe(res => {
      if (res.code == 200) {
        this.colors = res.data;
      }
    })
  }

idCate : any;
  getDataCategoryPareant(){
    this.categoryService.getCategoryPareant0().subscribe(res =>{
      if (res.code == 200) {
        this.categoryPareant0 = res.data;
        // for (let i = 0; i < res.data.length; i++) {
        //   this.idCate = res.data[i].id;
        //   this.categoryService.getCategoryPareantByIdCategory(this.idCate).subscribe(res2 =>{
        //     if(res2 != null){
        //       this.categoryPareant = res2.data;
        //     }
        //   })
        // }
        // console.log(this.categoryPareant.length);
      }
    })
    
  }


  // uploadd image
  uploadImage(event:any){
    this.file = event.target.files[0];
  }



  getCategoryPareant(){
    this.categoryService.getCategory().subscribe(res =>{
      if (res.code == 200) {
        this.allCategory = res.data;
      }
    })
  }


  // thêm mới
  onSubmit() {
    // this.uploadImageTest();
    this.handleFile.upload(this.file).subscribe(res => {
      console.log(res);
    })
  }




  // clear form 
  clearInfo() {
    
  }




  getDataById(category_id: any) {
   
  }




  // cập nhập

  onSubmitUpdate() {
   
  }




  // xóa category
  deleteCategory(id: any) {
   
  }


  searchCategory() {
    
  }




  idCategory : any[] = [];
  btnDeleteAll(){

  }


  btnDelete:boolean = false;
  checkDelete(e:any){
    
  }


  btnDeleteItems(){
    
  }




  // show item 
  showItem(e:any){
    this.itemPage = e.target.value;
    
  }

  removeAccents(str: any) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }



  openModalAddNew(){
    // loadDataColor();
  }

}



  // "angular-material": "^1.2.5",