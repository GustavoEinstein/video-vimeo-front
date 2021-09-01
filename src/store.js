import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {

        uploadBoxState: {
            uploadBoxController: false,
            video: [],
        }
    } ,
    mutations: {
      fetchuploadBoxContoller (state, upload) {
          state.uploadBoxState.uploadBoxController = upload
      },
      fetchnameVideo (state, name) {
          
          state.uploadBoxState.video.push(name)
      },
      fetchVideoStatus(state,status){

          state.uploadBoxState.video[status.index].videoStatus = status.videoStatus
      },
      clearVideo (state){
          state.uploadBoxState.video = []
      }


    },
    actions: {
        fetchuploadBoxContoller (context,upload) {
            context.commit("fetchuploadBoxContoller",upload)
        },
        fetchnameVideo(context,name) {
            context.commit("fetchnameVideo", name)
        },
        fetchVideoStatus(context,status) {
            context.commit("fetchVideoStatus", status)
        },
        clearVideo (context) {
            context.commit("clearVideo")
        }
    },
    getters: {
        getuploadBoxController: state => {
            return state.uploadBoxState.uploadBoxController
        },
        getvideoName: state => {
            return state.uploadBoxState.video
        }

    }
});

export default store