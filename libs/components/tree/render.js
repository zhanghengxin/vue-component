/**
 * Created by gaoguoqing on 2018/12/3.
 *
 */
export default {
    name: 'RenderNode',
    functional: true,
    props: {
        render: Function,
        data: Object,
        node: Array
    },
    render: (h, self) => {
        const params = {
            root: self.props.node[0],
            node: self.props.node[1],
            data: self.props.data
        }
        return self.props.render(h, params)
    }
}
