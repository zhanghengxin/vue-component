
<div class="example-box">
    <b-steps current="2" status="error" :click='click'>
        <b-step title="aaaaa"></b-step>
        <b-step title="bbbbb"></b-step>
        <b-step title="ccccc"></b-step>
    </b-steps>
</div>

<script>
    export default {
        data(){
            return {
                content:'adadadadasdadadad'
            }
        },
        methods:{
            click(e){
                console.log(e);
            }
        }
    }
</script>


