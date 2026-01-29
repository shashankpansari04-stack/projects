namespace sony.metro;


entity student {
    key id: String(32);
    name : String(255);
    gender: String(1);
    rollNo: Integer64;
    //foreign key = column name = class CONCATE id = class_id
    class: Association to one class;
}


entity class {
    key id: String(32);
    specialization: String(255);
    semester: Int32;
    hod: String(64);
}
