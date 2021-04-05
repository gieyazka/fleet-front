import React, { forwardRef } from "react";
import { useParams } from "react-router-dom";
import {
  Backdrop,
  Card,
  Fade,
  Modal,
  CardContent,
  CardAction,
} from "@material-ui/core";
import moment from "moment";
import MaterialTable from "material-table";

import {
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
} from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import ReactExport from "react-data-export";

const ReqTable = () => {
  const [tableRow, setTableRow] = React.useState({
    open: false,
    rowData: null,
  });
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const [reqData, setReqData] = React.useState();
  const [exportExcel, setExportExcel] = React.useState(false);
  const getData = async () => {
    return await fetch(
      `https://delivery-backend-1.powermap.live/specialrequests`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(async (res) => {
        return res;
      });
  };
  React.useState(async () => {
    await getData().then(async (data) => {
      setReqData(data);
      const borders = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      const style = {
        alignment: { horizontal: "center" },
        border: borders,
        fill: { patternType: "solid", fgColor: { rgb: "1D366D" } },
        font: {
          color: { rgb: "ffffff" },
        },
      };
      const styleNoColor = {
        alignment: { horizontal: "center" },
        border: borders,
      };

      let destArr,
        dest,
        destData = [];
      let destLength;
      let maxDestLength = 0;
      /** find max dest length */
      data.map((d) => {
        dest = JSON.parse(d.dest_place.split(","));

        if (dest.length > maxDestLength) {
          maxDestLength = dest.length;
        }
      });
      let column = [
        {
          title: "#",
          style: style,

          width: { wpx: 80 },
        },
        {
          title: "Cost Company",
          style: style,

          width: { wpx: 80 },
        }, //pixels width
        {
          title: "Suppiler",
          width: { wpx: 90 },
          style: style,
        }, //char width
        {
          title: "Invoice Number",
          style: style,
          width: { wch: 30 },
        },
        { title: "Job No", style: style, width: { wch: 35 } },
        { title: "Date Submit", style: style, width: { wch: 10 } }, //char width
        { title: "Origin", style: style, width: { wpx: 80 } },
      ];
      for (let i = 0; i < maxDestLength; i++) {
        column.push({
          title: `Des ${i + 1}`,
          style: style,
          width: { wpx: 150 },
        });
      }

      column.push(
        { title: "Product", style: style, width: { wpx: 90 } },
        { title: "Note", style: style, width: { wpx: 90 } },
        { title: "Return", style: style, width: { wpx: 90 } },
        { title: "Overtime", style: style, width: { wpx: 90 } },
        { title: "Department", style: style, width: { wpx: 90 } },
        { title: "No of trip", style: style, width: { wpx: 90 } },
        { title: "Truck Type", style: style, width: { wpx: 90 } },
        { title: "Total Price", style: style, width: { wpx: 90 } },
        {
          title: "Name user request",
          style: style,
          width: { wpx: 90 },
        },
        { title: "Name Manager", style: style, width: { wpx: 90 } },
        {
          title: "manager Approved",
          style: style,
          width: { wpx: 90 },
        }
      );

      data.map((d, i) => {
        destArr = [
          { value: i, style: styleNoColor },
          { value: d.cost, style: styleNoColor },
          { value: d.suppiler, style: styleNoColor },
          { value: 0, style: styleNoColor },
          { value: d.job_no, style: styleNoColor },
          { value: d.date, style: styleNoColor },
          { value: d.start_place, style: styleNoColor },
        ];
        for (let i = 0; i < maxDestLength; i++) {
          destArr.push({
            style: styleNoColor,
            value: JSON.parse(d.dest_place.split(","))[i] || "",
          });
        }

        let managerName = null;
        JSON.parse(d.approve_by)
          .split(",")
          .map((r) => {
            if (managerName != null) {
              managerName += "," + r.substr(0, r.indexOf("@"));
            } else {
              managerName = r.substr(0, r.indexOf("@"));
            }
          });
        destArr.push(
          { value: d.product, style: styleNoColor },

          { value: d.purpose, style: styleNoColor },
          { value: d.return, style: styleNoColor },
          { value: "Yes", style: styleNoColor },
          { value: "department", style: styleNoColor },
          { value: "No of trip", style: styleNoColor },
          { value: d.car_type, style: styleNoColor },
          { value: "Total Price", style: styleNoColor },
          { value: d.request_by, style: styleNoColor },
          { value: managerName, style: styleNoColor },
          { value: d.status, style: styleNoColor }
        );
        destData.push(destArr);
      });

      const multiDataSet = [
        {
          columns: column,

          data: destData,
        },
      ];

      setExportExcel({ status: true, data: multiDataSet });
    });
  }, []);

  const excelData = async (data) => {
    const borders = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
    const style = {
      alignment: { horizontal: "center" },
      border: borders,
      fill: { patternType: "solid", fgColor: { rgb: "1D366D" } },
      font: {
        color: { rgb: "ffffff" },
      },
    };
    const styleNoColor = {
      alignment: { horizontal: "center" },
      border: borders,
    };

    let destArr,
      dest,
      destData = [];
    let destLength;
    let maxDestLength = 0;
    /** find max dest length */
    data.map((d) => {
      dest = JSON.parse(d.dest_place.split(","));

      if (dest.length > maxDestLength) {
        maxDestLength = dest.length;
      }
    });
    let column = [
      {
        title: "#",
        style: style,

        width: { wpx: 80 },
      },
      {
        title: "Cost Company",
        style: style,

        width: { wpx: 80 },
      }, //pixels width
      {
        title: "Suppiler",
        width: { wpx: 90 },
        style: style,
      }, //char width
      {
        title: "Invoice Number",
        style: style,
        width: { wch: 30 },
      },
      { title: "Job No", style: style, width: { wch: 35 } },
      { title: "Date Submit", style: style, width: { wch: 10 } }, //char width
      { title: "Origin", style: style, width: { wpx: 80 } },
    ];
    for (let i = 0; i < maxDestLength; i++) {
      column.push({ title: `Des ${i + 1}`, style: style, width: { wpx: 150 } });
    }

    column.push(
      { title: "Product", style: style, width: { wpx: 90 } },
      { title: "Note", style: style, width: { wpx: 90 } },
      { title: "Return", style: style, width: { wpx: 90 } },
      { title: "Overtime", style: style, width: { wpx: 90 } },
      { title: "Department", style: style, width: { wpx: 90 } },
      { title: "No of trip", style: style, width: { wpx: 90 } },
      { title: "Truck Type", style: style, width: { wpx: 90 } },
      { title: "Total Price", style: style, width: { wpx: 90 } },
      {
        title: "Name user request",
        style: style,
        width: { wpx: 90 },
      },
      { title: "Name Manager", style: style, width: { wpx: 90 } },
      {
        title: "manager Approved",
        style: style,
        width: { wpx: 90 },
      }
    );

    data.map((d, i) => {
      destArr = [
        { value: i, style: styleNoColor },
        { value: d.cost, style: styleNoColor },
        { value: d.suppiler, style: styleNoColor },
        { value: 0, style: styleNoColor },
        { value: d.job_no, style: styleNoColor },
        { value: d.date, style: styleNoColor },
        { value: d.start_place, style: styleNoColor },
      ];
      for (let i = 0; i < maxDestLength; i++) {
        destArr.push({
          style: styleNoColor,
          value: JSON.parse(d.dest_place.split(","))[i] || "",
        });
      }

      let managerName = null;
      JSON.parse(d.approve_by)
        .split(",")
        .map((r) => {
          if (managerName != null) {
            managerName += "," + r.substr(0, r.indexOf("@"));
          } else {
            managerName = r.substr(0, r.indexOf("@"));
          }
        });
      destArr.push(
        { value: d.product, style: styleNoColor },

        { value: d.purpose, style: styleNoColor },
        { value: d.return, style: styleNoColor },
        { value: "Yes", style: styleNoColor },
        { value: "department", style: styleNoColor },
        { value: "No of trip", style: styleNoColor },
        { value: d.car_type, style: styleNoColor },
        { value: "Total Price", style: styleNoColor },
        { value: d.request_by, style: styleNoColor },
        { value: managerName, style: styleNoColor },
        { value: d.status, style: styleNoColor }
      );
      destData.push(destArr);
    });

    const multiDataSet = [
      {
        columns: column,

        data: destData,
      },
    ];

    setExportExcel({ status: true, data: multiDataSet });
    // setExportExcel({ ...exportExcel, status: true });
  };
  React.useEffect(() => {
    if (exportExcel.status === true) {
      setExportExcel({ ...exportExcel, status: false });
    }
  }, [exportExcel]);

  return (
    <>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={tableRow.open}
        onClose={() => setTableRow({ ...tableRow, open: false })}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={tableRow.open}>
          <div
            style={{
              backgroundColor: "white",

              padding: "40px",
            }}
          >
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
      <div
        style={{
          marginRight: "4vw",
          marginLeft: "4vw",
          marginTop: "4vw",
          marginBottom: "4vw",
          maxWidth: "100%",
        }}
      >
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: "Job No", field: "job_no" },
            {
              title: "Cost",
              field: "cost",
            },
            { title: "Suppiler", field: "suppiler" },
            { title: "Type of car", field: "car_type" },
            { title: "Amount of car", field: "car_amount" },
            { title: "Product", field: "product" },
            { title: "Request date", field: "request_date" },
            { title: "Arrive time", field: "arrive_time" },
            { title: "Start place", field: "start_place" },
            {
              title: "Destination",
              render: (rowData) => JSON.parse(rowData.dest_place) + " ",
            },

            { title: "Purpose", field: "purpose" },
            { title: "Request by", field: "request_by" },
            { title: "Approve by", field: "approve_by" },
            // { title: "Arrange by", field: "arrange_by" },
            // {
            //   title: "Arrange date",
            //   render: (rowData) =>
            //     moment(rowData.arrange_date, "YYYYMMDD").format("DD-MM-YYYY"),
            // },
            { title: "Status request", field: "status" },
          ]}
          data={reqData}
          // data={(query) =>
          //   new Promise((resolve, reject) => {
          //     let url = `https://delivery-backend-1.powermap.live/specialrequests?`;
          //     url += "_limit=" + query.pageSize;
          //     url += "&_start=" + query.page * query.pageSize;
          //     fetch(url).then((response) => {
          //       console.log(query);
          //       let length = response.headers.get("content-range");
          //       response.json().then((result) => {
          //         console.log(result);
          //         resolve({
          //           data: result,
          //           page: query.page,
          //           totalCount: length,
          //         });
          //       });
          //     });
          //   })
          // }
          actions={[
            {
              icon: () => (
                <ExcelFile
                  element={<SaveAlt style={{ marginTop: 6 }} />}
                  filename="Delivery Request"
                >
                  <ExcelSheet
                    dataSet={exportExcel.data}
                    name="Delivery Request"
                  ></ExcelSheet>
                </ExcelFile>
              ),
              tooltip: "Export Xlsx ",
              isFreeAction: true,
            },
            {
              icon: "edit",
              tooltip: "Save User",
              onClick: (event, rowData) => {
                setTableRow({ rowData: rowData, open: true });
              },
            },
          ]}
          options={{
            // exportButton: true,
            // exportCsv: async (columns, data) => {
            //   await excelData(data);
            //   // return columns, data;
            // },
            search: true,
            // cellStyle: {
            //   minWidth: "500px",
            // },
            headerStyle: {
              fontWeight: "bold",
              minWidth: "100px",
            },
          }}
          title="Delivery Request"
        />
        {/* {exportExcel.status == true && (
          // <ExcelFile element={<button>Download Data</button>} filename="Delivery Request">
          <ExcelFile hideElement={true} filename="Delivery Request">
            <ExcelSheet
              dataSet={exportExcel.data}
              name="Delivery Request"
            ></ExcelSheet>
          </ExcelFile>
        )} */}
      </div>
    </>
  );
};
export default ReqTable;
