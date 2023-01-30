import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/service/category.service';
import { ModalModule, ModalDirective} from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/service/loading.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

declare function greet(): void;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

@Injectable()
export class CategoryComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  @ViewChild('deleteItem') deleteItem: any;

  constructor(private categoryService: CategoryService,
              public loader: LoadingService) { }

  @ViewChild(ModalDirective) modal!: ModalDirective;

  data: Category[] = [];

  category: Category[] = [];

  totalLength: any;

  page: number = 1;

  itemPage: number = 10;

  nameSearch: any;

  checkPareant:boolean = false;

  startItem : any = 1;

 


  info: FormGroup = new FormGroup({
    id: new FormControl(''),
    nameCategory: new FormControl(''),
    status: new FormControl("1"),
    createAt: new FormControl(""),
    idPareant: new FormControl(''),
  })



  ngOnInit(): void {
    this.getDataService();
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
    this.categoryService.getCategory().subscribe(res => {
      // this.data = res.data;
      this.data = res.data;
    })
    this.categoryService.getCategoryPareant0().subscribe(res => {
      this.category = res.data;
    })
  }





  // thêm mới
  onSubmit() {
    this.categoryService.addCategory(this.info.value).subscribe(res => {
      if (res.code == 200) {
        this.openToast("Thêm Mới Thành Công","success");
        this.closebutton.nativeElement.click();
      } else {
        this.openToast("Thêm Mới Không Thành Công","error");
      }
      this.getDataService();
      this.clearInfo();
    })
  }


  // onSubmit(){
    
  //   for (let i = 1000; i < 2500; i++) {
  //     this.info = new FormGroup({
  //       nameCategory: new FormControl('Test '+i),
  //       status: new FormControl("1"),
  //       // createAt: new FormControl(""),
  //       idPareant: new FormControl('0'),
  //     })
  //     this.categoryService.addCategory(this.info.value).subscribe(res => {
  //       console.log(res);
  //     });
  //   }
  // }



  // clear form 
  clearInfo() {
    this.info = new FormGroup({
      id: new FormControl(''),
      nameCategory: new FormControl(''),
      status: new FormControl("1"),
      idPareant: new FormControl(''),
    })
  }



  // get data by id
  idPareant: any;
  getDataById(category_id: any) {
    this.categoryService.getCategoryById(category_id).subscribe(res => {
      var data = res.data;
      this.idPareant = data.idPareant;
      this.info = new FormGroup({
        id: new FormControl(`${data.id}`),
        nameCategory: new FormControl(`${data.nameCategory}`),
        status: new FormControl(`${data.status}`),
        createAt: new FormControl(`${data.createAt}`),
        idPareant: new FormControl(`${data.idPareant}`),
      })
    })
  }




  // cập nhập
  check = false;
  onSubmitUpdate() {
    this.categoryService.updateCategory(this.info.value).subscribe(res => {
      if (res.code == 200) {
        this.openToast("Cập Nhập Thành Công","success");
        this.check = true;
      } else {
        this.openToast("Cập Nhập Không Thành Công","error");
      }
      this.getDataService();
    })
  }




  // xóa category
  deleteCategory(id: any) {
    Swal.fire({
      title: 'Bạn Có Chắc Chắn Muốn Xóa ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.getCategoryById(id).subscribe(res => {
          var data = res.data;
          this.info = new FormGroup({
            id: new FormControl(`${data.id}`),
            nameCategory: new FormControl(`${data.nameCategory}`),
            status: new FormControl(`${data.status}`),
            deleteFlag: new FormControl(1),
            createAt: new FormControl(`${data.createAt}`),
            idPareant: new FormControl(`${data.idPareant}`),
          })
          if (res != null) {
            this.categoryService.updateCategory(this.info.value).subscribe(res => {
              if (res.code == 200) {
                this.openToast("Xóa Thành Công","success");
              } else {
                this.openToast("Xóa Thành Công","error");
              }
              this.getDataService();
            })
          }
        })
      }
    })
  }


  searchCategory() {
    if (this.nameSearch.length != 0) {
      this.categoryService.searchCategory(this.nameSearch.trim()).subscribe(res => {
        this.data = res.data;
        this.page = 1;
      })
    } else {
      this.ngOnInit();
    }
  }




  idCategory : any[] = [];
  btnDeleteAll(){
    this.data.forEach(e => {
      var id = e.id;
      this.idCategory.push(id);
    });
    for (let i = 0; i < this.data.length; i++) {
      this.categoryService.deletesCategory(this.idCategory[i]).subscribe(res=>{
        if(res.data==200){
          this.openToast("Xóa Thành Công","success");
        }else{
          this.openToast("Xóa Thành Công","error");
        }
        this.getDataService();
      })
    }    
  }

  id: any; arrIdCategory: number[] = []; checkBox: boolean = false;
  btnDelete:boolean = false;
  checkDelete(e:any){
    this.checkBox = e.target.checked;
    this.id = e.target.value;
    if(this.checkBox == true){
      this.arrIdCategory.push(this.id)
    }else{
      this.arrIdCategory = this.arrIdCategory.filter(item => item !== this.id)
    }
    if(this.arrIdCategory.length!=0){
      this.btnDelete = true;
    }else{
      this.btnDelete = false;
    }
  }


  btnDeleteItems(){
    this.arrIdCategory.forEach(e => {
      this.categoryService.deletesCategory(e).subscribe(res=>{
        if(res.data==200){
          this.openToast("Xóa Thành Công","success");
        }else{
          this.openToast("Xóa Thành Công","error");
        }
        this.getDataService();
      })
    });
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


}



// Đang làm đếm function deleteAll();