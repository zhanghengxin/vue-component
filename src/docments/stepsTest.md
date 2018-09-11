
<div class="example-box">
    <b-steps :current="2"  size="small">
        <b-step title="aaaaa"></b-step>
        <b-step title="bbbbb"></b-step>
        <b-step title="ccccc"></b-step>
    </b-steps>
    <b-steps :current="2"  size="small">
        <b-step title="aaaaa"></b-step>
        <b-step title="bbbbb"></b-step>
        <b-step title="ccccc"></b-step>
    </b-steps>
    <b-steps>
        <b-step title="aaaaa"></b-step>
        <b-step title="bbbbb"></b-step>
        <b-step title="ccccc"></b-step>
    </b-steps>
    <b-steps :current="2" status="error" >
        <b-step title="aaaaa"></b-step>
        <b-step title="bbbbb"></b-step>
        <b-step title="ccccc"></b-step>
    </b-steps>
</div>

<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>


