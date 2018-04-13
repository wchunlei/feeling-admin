import Cookies from 'js-cookie';
import { reslist } from 'api/resource';
import { scriptlist } from 'api/story';
import { homefmlist } from 'api/homefm';

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    visitedViews: [],
    resource: [],
    scripts: [],
    fms: [],
    rewardTable: true,
    rewardInfo: false
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.includes(view)) return
      state.visitedViews.push(view)
    },
    DEL_VISITED_VIEWS: (state, view) => {
      const index = state.visitedViews.indexOf(view)
      state.visitedViews.splice(index, 1)
    },
    getVideoResource: state => {
      let typeinfo = {};
      typeinfo.type = '2';
      reslist (typeinfo).then(response => {
        if (state.resource) {
          state.resource = [];
        }
        if(response.data.code==200){
          for (let i=0; i<response.data.content.length; i++) {
            let temp = {};
            temp.value = response.data.content[i].id;
            temp.label = response.data.content[i].name;
            temp.fileid = response.data.content[i].fileid;
            state.resource.push(temp);
          }
        }
      });
    },
    scripts: (state,actorid) => {
      let listQuery = {
        page: '1',
        limit: '1000'
      };
      scriptlist(listQuery).then(response => {
        /*state.scripts = response.data.content.map(v => ({
          key: v.id,
          label: v.title
        }))*/
        let arr = [];
        response.data.content.forEach((val,index,arr1) => {
          if(val.actorid == actorid) {
            arr.push(val);
          }
        })
        state.scripts = arr.map(v => ({
          key: v.id,
          label: v.title
        }))
        //console.log('state.scripts',state.scripts)
      })
      homefmlist(this.listQuery).then(response => {
        /*state.fms = response.data.content.map(v => ({
          key: v.id,
          label: v.title
        }))*/
        let arr = [];
        response.data.content.forEach((val,index,arr1) => {
          if(val.actorid == actorid) {
            arr.push(val);
          }
        })
        state.fms = arr.map(v => ({
          key: v.id,
          label: v.title
        }))
      })
    },
    rewardTa: state => {
      state.rewardTable = true;
      state.rewardInfo = false;
    },
    rewardIn: state => {
      state.rewardTable = false;
      state.rewardInfo = true;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({ commit }, view) => {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews: ({ commit }, view) => {
      commit('DEL_VISITED_VIEWS', view)
    }
  }
};

export default app;
