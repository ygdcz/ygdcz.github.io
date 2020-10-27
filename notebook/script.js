// New VueJS instance
Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'));
new Vue({
	name: 'notebook',

	// CSS selector of the root DOM element
	el: '#notebook',

	// Some data
	data() {
		return {
			// content: 'This is a note',
			// content: localStorage.getItem('content') || 'You can write in **markdown**',
			notes: JSON.parse(localStorage.getItem('notes')) || [],
			selectedId: localStorage.getItem('selected-id') || null,
		}
	},

	// Computed properties
	computed: {
		notePreview() {
			// Markdown rendered to HTML
			return this.selectedNote? marked(this.selectedNote.content) : '';
		},
		addButtonTitle() {
			return this.notes.length + ' note(s) already';
		},
		selectedNote() {
			return this.notes.find(note => note.id === this.selectedId);
		},
		sortedNotes() {
			// slice創建新副本，防止触发notes侦听器
			return this.notes.slice()
			.sort((a,b) => a.created - b.created)
			.sort((a,b) => (a.favorite === b.favorite)? 0: a.favorite ? -1: 1)
		},
		lineCount() {
			if(this.selectedNote) {
				return this.selectedNote.content.split('/\r\n|\r|\n/').length;
			}
		},
		wordsCount() {
			if(this.selectedNote) {
				var s = this.selectedNote.content;
				// 将换行符转化为空格
				s = s.replace(/\n/g, ' ');
				// 排除开头和结尾的空格
				s = s.replace(/(^\s*)|(\s*$)/gi, '');
				// 将多个空格转化为一个
				s = s.replace(/\s\s+/gi,' ');
				// 返回空格数量
				return s.split(' ').length;
			}
		},
		characterCount() {
			if(this.selectedNote) {
				return this.selectedNote.content.split('').length;
			}
		}
	},

	// Change watchers
	watch: {
		/*content: {
		  handler (val, oldVal) {
		    console.log('new note:', val, 'old note:', oldVal)
		    localStorage.setItem('content', val)
		  },
		  immediate: true,
		},*/

		/*content (val) {
		  localStorage.setItem('content', val)
		},*/

		/*content: {
		  handler: 'saveNote',
		},*/

		content: 'saveNote',
		notes: {
			handler: 'saveNotes',
			deep: true
		},
		selectedId(val) {
			localStorage.setItem('selected-id', val);
		}
	},
	methods: {
		saveNote(val, oldVal) {
			console.log('new note:', val, 'old note:', oldVal)
			console.log('saving note:', this.content)
			localStorage.setItem('content', this.content)
			this.reportOperation('saving')
		},
		reportOperation(opName) {
			console.log('The', opName, 'operation was completed!')
		},
		addNote() {
			const time = Date.now();
			// new note default props
			const note = {
				id: String(time),
				title: 'New note ' + (this.notes.length + 1),
				content: `**Hi!** This notebook is using,
				[markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!`,
				created: time,
				favorite: false,
			}
			// add to the list
			this.notes.push(note)
		},
		selectNote(note) {
			this.selectedId = note.id;
		},
		saveNotes() {
			localStorage.setItem('notes', JSON.stringify(this.notes));
			console.log('Notes saved!', new Date());
		},
		removeNote(){
			if(this.selectedNote && confirm('Delete the note?')) {
				const index = this.notes.indexOf(this.selectedNote);
				if(index !== -1) {
					this.notes.splice(index, 1);
				}
			}
		},
		favoriteNote() {
			this.selectedNote.favorite = ! this.selectedNote.favorite
			// this.selectedNote.favorite ^= true
		}
	},

	/* created () {
	  this.content = localStorage.getItem('content') || 'You can write in **markdown**'
	}, */
})
