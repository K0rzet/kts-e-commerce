declare global {
  interface Window {
    YooKassa: {
      new(options: {
        confirmation_token: string;
        return_url: string;
        error_callback?: (error: { message: string }) => void;
        success_callback?: () => void;
        fail_callback?: () => void;
        embedded?: boolean;
        modal?: boolean;
        newDesign?: boolean;
      }): {
        render: (elementId: string) => void;
        destroy: () => void;
      };
    };
  }
}

export {}; 