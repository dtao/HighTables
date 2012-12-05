require "yui/compressor"

namespace :compress do
  desc "Concatenate and minify JavaScript assets into a single file"
  task :js do
    javascript = %w{parse table linechart barchart piechart hightables}.map do |filename|
      File.read(File.join("dist", "#{filename}.js"))
    end.join("\n")

    compressor = YUI::JavaScriptCompressor.new(:munge => true)
    File.open(File.join("dist", "hightables.min.js"), "w") do |stream|
      stream.write(compressor.compress(javascript))
    end
  end
end
