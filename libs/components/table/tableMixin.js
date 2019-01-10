/**
 * Created by gaoguoqing on 2018/12/17.
 *
 */
export default {
    methods: {
        alignCls (column, row = {}) {
            let _cellClass = ''
            if (row._cellClass && column.key && row._cellClass[column.key]) {
                _cellClass = row._cellClass[column.key]
            }
            return [
                {
                    [`${this.preCls}-column-${column.align}`]: column.align,
                    [`${column.className}`]: column.className,
                    [`${_cellClass}`]: _cellClass
                }
            ]
        },
        setCellWidth (column) {
            let width = ''
            if (column._width) {
                width = column._width
            }
            if (width === '0') width = ''
            return width
        },
        cellColspan (row, column) {
            let colspan = 1
            if (row.colspan && column.key && row.colspan[column.key]) {
                colspan = row.colspan[column.key]
            }
            return colspan
        },
        cellRowspan (row, column) {
            let rowspan = ''
            if (row.rowspan && column.key && row.rowspan[column.key]) {
                rowspan = row.rowspan[column.key]
            }
            return rowspan
        }
    }
}