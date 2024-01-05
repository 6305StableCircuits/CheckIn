<script lang=ts>
    import { db } from "$lib/firebase";
    import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
    import { getDocs, collection } from "firebase/firestore";

    const provider = new GoogleAuthProvider();

    const auth = getAuth();

    function logIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            const query = getDocs(collection(db, "users"));
            query.then((userData) => {
                if(
                    userData.docs.some((record) => {
                        if(record.get('email') == user.email) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                ) {
                    return;
                } else {
                    signOut(auth);
                }
            })
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
</script>

<div class="flex items-center justify-center h-screen bg-slate-900">
    <button on:click={logIn} class="px-3xl py-lg text-8xl font-bold bg-green-500 hover:bg-green-600 rounded-2xl">
        Log In
    </button>
</div>