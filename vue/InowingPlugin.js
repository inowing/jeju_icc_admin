// Vue.js 플러그인은install 메소드를 노출해야합니다. 이 메소드는 첫 번째 인자로 Vue 생성자와 함께 가능한 옵션과 함께 호출 될 것입니다.
// https://joshua1988.github.io/vue-camp/reuse/plugins.html#%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95
export default {
    install (Vue, options) {
        // this.$showMsgBoxTwo(response.status, 'insert', '하고픈말'); 
        Vue.prototype.$showMsgBoxTwo = function (status, type, inputMessage, callback) {
            let msg = '';
            let okVariant = '';
            if (status == 200) {
                let methodof = {
                    insert: "저장",
                    delete: "삭제",
                    update: "수정"
                }
                msg = inputMessage ? inputMessage : `성공적으로 ${methodof[type]||'저장'}되었습니다.`;
                okVariant = 'success';
            } else {
                msg = `${status} : ${inputMessage}`||'실패 하였습니다.';
                okVariant = 'danger';
            }

            this.boxTwo = ''
            this.$bvModal.msgBoxOk(msg, {
                title: 'Confirmation',
                size: 'sm',
                buttonSize: 'sm',
                okVariant,
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
            })
                .then(value => {
                    this.boxTwo = value;
                    if (value) {
                        callback();
                    }
                })
                .catch(err => {
                    // An error occurred
                })
        }
 
        Vue.prototype.$toast = function (title, inputMessage, variant) {
            this.$bvToast.toast(inputMessage, {
                title,
                variant: variant||'success',
                solid: true
            })
        }
        
        Vue.prototype.onFileChange = function (e, url) {
            // 최초 설계시 개별 콤포넌트에서 사용중이던 함수를 끌어다 놓다보니
            // 너무 지엽적이고 함수 외부에서 url이 존재해야 하는구조임.
            // console.log('object 이면 뭔가 해야하네...', url);
            const file = e.target.files[0];
            this[url] = URL.createObjectURL(file); // 개별컴포넌트에 변경되는 url 받아줄 변수가 있어야함.
        }

        Vue.prototype.$fileUploadChecker = function (local, database) {
            // 0.아무것도 안한다. 1.업로드한다 2.지운다
            if (!database && local) { // x - o
                return 1;
            }
            if (database && !local) { // o - x
                return 2;
            }
            if (database != local) { // compare
                return 1;
            }
            return 0;
        }

    }
    
}