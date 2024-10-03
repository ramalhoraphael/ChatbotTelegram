{ pkgs }:

{
  deps = [ pkgs.nodejs ];

  shell = pkgs.mkShell {
    buildInputs = [ pkgs.nodejs pkgs.yarn ];

    shellHook = ''
      export PATH=$PATH:$(pwd)/ChatbotTelegram
    '';
  };
}
