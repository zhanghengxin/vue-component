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
                    [`${this.preCls}-column-expand`]: column.expandRender,
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
        isPopperShow (column) {
            return column.filters && ((!this.fixed && !column.fixed) || (this.fixed === 'left' && column.fixed === 'left') || (this.fixed === 'right' && column.fixed === 'right'))
        },
        cellColspan (row, column) {
            let colspan = 1
            if (row._colspan && column.key && row._colspan[column.key]) {
                colspan = row._colspan[column.key]
            }
            return colspan
        },
        cellRowspan (row, column) {
            let rowspan = ''
            if (row._rowspan && column.key && row._rowspan[column.key]) {
                rowspan = row._rowspan[column.key]
            }
            return rowspan
        }
    }
}
