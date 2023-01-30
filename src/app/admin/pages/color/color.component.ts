import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/service/color.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  constructor(private colorService: ColorService) { }

  @ViewChild('closebutton') closebutton: any;

  data: Color[] = [];


  totalLength: any;

  page: number = 1;

  itemPage: number = 10;

  nameSearch: any;

  checkPareant: boolean = false;

  startItem: any = 1;


  codeColor = [];

  info: FormGroup = new FormGroup({
    id: new FormControl(''),
    nameColor: new FormControl(''),
    codeColor: new FormControl(''),
    createAt: new FormControl(''),
  })


  ngOnInit(): void {
    this.getDataService();
  }


  openToast(title: any, icon: any) {
    let toastr = Swal.fire({
      title: title,
      toast: true,
      icon: icon,
      position: 'top-end',
      showCancelButton: false,
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 1800
    });
  }


  // get data to service

  getDataService() {
    this.colorService.getColor().subscribe(res => {
      if (res.code == 200) {
        this.data = res.data;
      }
    })
  }


  clickBtnAdd(){
    this.clearInfo();
  }


  // thêm mới
  onSubmit() {
    this.colorService.saveColor(this.info.value).subscribe(res => {
      if (res.data != 200)
        this.openToast("Thêm Mới Thất Bại", "error");
      this.openToast("Thêm Mới Thành Công", "success");
      this.closebutton.nativeElement.click();
      this.getDataService();
    })
  }



  // clear form 
  clearInfo() {
    this.info = new FormGroup({
      id: new FormControl(''),
      nameColor: new FormControl(''),
      codeColor: new FormControl(''),
      createAt: new FormControl(''),
    })
  }



  // get data by id
  getDataById(colorId: any) {
    this.colorService.findById(colorId).subscribe(res=>{
      var data = res.data;
      this.info = new FormGroup({
        id: new FormControl(`${data.id}`),
        nameColor: new FormControl(`${data.nameColor}`),
        codeColor: new FormControl((`${data.codeColor}`)),
        createAt: new FormControl((`${data.createAt}`)),
      })
    })
  }




  // cập nhập
  onSubmitUpdate() {
    this.colorService.updateColor(this.info.value).subscribe(res => {
      if (res.code == 200) {
        this.openToast("Cập Nhập Thành Công","success");
        this.closebutton.nativeElement.click();
      } else {
        this.openToast("Cập Nhập Không Thành Công","error");
      }
      this.getDataService();
    })
  }




  // xóa color
  deleteColor(id: any) {
    Swal.fire({
      title: 'Bạn Chắc Chắn Muốn Xóa ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // success
      }
    })
  }


  searchColor() {
    console.log(this.nameSearch);
  }




  idCategory: any[] = [];
  btnDeleteAll() {

  }

  id: any; arrIdCategory: number[] = []; checkBox: boolean = false;
  btnDelete: boolean = false;
  checkDelete(e: any) {
    this.checkBox = e.target.checked;
    this.id = e.target.value;
    if (this.checkBox == true) {
      this.arrIdCategory.push(this.id)
    } else {
      this.arrIdCategory = this.arrIdCategory.filter(item => item !== this.id)
    }
    if (this.arrIdCategory.length != 0) {
      this.btnDelete = true;
    } else {
      this.btnDelete = false;
    }
  }


  btnDeleteItems() {

  }




  // show item 
  showItem(e: any) {

  }

}
