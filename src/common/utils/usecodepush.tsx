import { useCallback, useEffect, useState } from 'react';
import CodePush, { DownloadProgress } from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
export interface CodePushStatusType {
    stat: number;
    downloadProgress: number;
}
const useCodePush = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [codePushStatus, setCodePushStatus] = useState<CodePushStatusType>({
        stat: 0,
        downloadProgress: 0,
    });
    const [version, setVersion] = useState<string | undefined>();

    const codePushStatusDidChange = useCallback(
        (status: CodePush.SyncStatus) => {
            switch (status) {
                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                    break;
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    setIsUpdating(true);
                    setCodePushStatus({
                        ...codePushStatus,
                        stat: 1,
                    });
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    break;
                case CodePush.SyncStatus.UP_TO_DATE:
                    break;
                case CodePush.SyncStatus.AWAITING_USER_ACTION:
                    setIsUpdating(false);
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                    setCodePushStatus({
                        ...codePushStatus,
                        stat: 2,
                    });
                    SplashScreen.show();
                    setIsUpdating(false);
                    CodePush.notifyAppReady();
                    CodePush.restartApp(true);
                    break;
            }
        },
        [codePushStatus],
    );

    const codePushDownloadDidProgress = useCallback(
        (progress: DownloadProgress) => {
            setCodePushStatus({
                ...codePushStatus,
                downloadProgress: Math.floor((progress.receivedBytes / progress.totalBytes) * 100),
            });
        },
        [codePushStatus],
    );

    useEffect(() => {
        async function getCodePushVersion() {
            const update = await CodePush.getUpdateMetadata();
            setVersion(`${update?.appVersion} (${update?.label})`);
        }
        getCodePushVersion();
    }, []);

    useEffect(() => {
        if (__DEV__) return;

        CodePush.sync(
            {
                installMode: CodePush.InstallMode.IMMEDIATE,
                mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
            },
            codePushStatusDidChange,
            codePushDownloadDidProgress,
        );
    }, [codePushDownloadDidProgress, codePushStatusDidChange]);

    return { isUpdating, codePushStatus, version };
};

export default useCodePush;
